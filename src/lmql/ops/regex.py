from typing import Iterable, Tuple, List
import re
import sre_parse
import sre_constants as c

import sys

REGEX_DERIVATIVE_FAILED = -1

def _deparse(seq):
    if seq is None: return seq
    pattern = ""
    for op, arg in seq:
        if op == c.LITERAL:
            pattern += chr(arg)
        elif op == c.MAX_REPEAT:
            min, max, item = arg
            pattern += _deparse(item)
            if min == 0 and max == c.MAXREPEAT: pattern += "*"
            elif min == 1 and max == c.MAXREPEAT: pattern += "+"
            elif min == max == 1: pass
            elif min == max: pattern += "{"+str(min)+"}"
            else: pattern += "{"+str(min)+","+str(max)+"}"
        elif op == c.AT and arg == c.AT_END:
            pattern += "$"
        elif op == c.SUBPATTERN and arg[3][0][0] == c.BRANCH:
            pattern += '(' + '|'.join([_deparse(a) for a in branches]) + ')'
        elif op == c.RANGE:
            low, high = arg
            pattern += chr(low) + '-' + chr(high)
        elif op == c.IN:
            assert isinstance(arg, list)
            pattern += '[' + ''.join([_deparse([a]) for a in arg]) + ']'
        else:
            assert False, f"unsupported regex pattern {op} with arg {arg}"
    return pattern

def _parse(pattern):
    seq = sre_parse.parse(pattern)
    assert isinstance(seq, sre_parse.SubPattern)
    seq = list(seq)
    return seq

def _consume_char(char, seq):
    assert isinstance(seq, list)
    if len(seq) == 0: return None
    op, arg = seq[0]
    if op == c.LITERAL:
        if arg == char: return seq[1:]
        else: return None
    elif op == c.IN:
        match_found = False
        for a in arg:
            if a[0] == c.LITERAL:
                match_found = (a[1] == char)
            elif a[0] == c.RANGE:
                match_found = (a[1][0] <= char <= a[1][1])
            else: return None
            if match_found: break
        if match_found: return seq[1:]
        else: return None
        low, high = arg[0][1]
        if low <= char <= high: return seq[1:]
        else: return None
    elif op == c.SUBPATTERN:
        arg0, arg1, arg2, sseq = arg
        print(sseq)
        assert len(sseq) == 1
        assert sseq[0][0] == c.BRANCH
        branches = sseq[0][1][1]
        branches_out = []
        for i, branch in enumerate(branches):
            dbranch = _consume_char(char, list(branch))
            if dbranch is not None: branches_out.append(dbranch)
        if len(branches_out) == 0: return None
        seq[0] = (op, (arg0, arg1, arg2, [(c.BRANCH, (None, branches_out))] ))
        return seq
        #return _consume_char(char, sseq)
    elif op == c.MAX_REPEAT:
        min_occr, max_occr, sseq = arg
        sseq = list(sseq)
        dsseq = _consume_char(char, sseq)
        if dsseq is None:
            if min_occr == 0:
                # could not consume optional character
                # but could recover with next
                return _consume_char(char, seq[1:]) 
            else: return None
        min_occr = max(min_occr - 1, 0)
        if max_occr != c.MAXREPEAT:
            max_occr = max(max_occr - 1, min_occr)
        out = dsseq
        if max_occr > 0:
            out += [(op, (min_occr, max_occr, sseq))]
        return out + seq[1:]
    else:
        raise NotImplementedError(f"unsupported regex pattern {op}")

def _canonicalize(seq):
    seq_out = []
    for i, s in enumerate(seq):
        if len(s) == 0:
            seq[i] = None
            continue
        op, arg = s
        if op == c.MAX_REPEAT:
            min_occr, max_occr, sseq = arg
            if min_occr == max_occr == 0: pass
            elif min_occr == max_occr == 1:
                seq_out.extend(_canonicalize(sseq))
            else: seq_out.append(s)
        elif op == c.SUBPATTERN and arg[3][0][0] == c.BRANCH:
            branches = arg[3][0][1][1]
            branches = map(_canonicalize, branches)
            #branches = map(lambda x: list(filter(lambda y: len(y) > 0, x)), branches)
            branches = list(filter(lambda x: len(x) > 0, branches))
            if len(branches) == 1:
                seq_out.extend(branches[0])
            elif len(branches) >= 0:
                seq_out.append((op, (arg[0], arg[1], arg[2], [(c.BRANCH, (None, branches))] )))
        else: seq_out.append(s)
    return seq_out

def _consume(text, seq):
    chars = [ord(c) for c in text]
    for char in chars:
        seq = _consume_char(char, seq)
        if seq is None: return None
        seq = _canonicalize(seq)
    return seq

class Regex:

    def __init__(self, pattern):
        self.pattern = pattern
        self._complied = None

    @property 
    def compiled_pattern(self):
        if self._complied is None:
            self._complied = re.compile(self.pattern, re.UNICODE)
        return self._complied
    
    def is_empty(self):
        return self.pattern == ''
        
    def d(self, text):
        seq = _parse(self.pattern)
        seq = _consume(text, seq)
        if seq is None: return None
        return Regex(_deparse(seq))
   
    def fullmatch(self, text):
        return self.compiled_pattern.fullmatch(text) is not None

    def compare_pattern(self, pattern):
        return _deparse(_canonicalize(_parse(self.pattern))) == _deparse(_canonicalize(_parse(pattern)))
    
if __name__ == "__main__":
    assert Regex(r"abc").d("a").compare_pattern(r"bc")
    assert Regex(r"abc").d("ab").compare_pattern(r"c")
    assert Regex(r"abc").d("b") is None
    assert Regex(r"a{2}bc").d("aa").compare_pattern(r"bc")
    assert Regex(r"a{2}bc").d("a").compare_pattern(r"abc")
    assert Regex(r"a*bc").d("a").compare_pattern(r"a*bc")
    assert Regex(r"a+bc").d("a").compare_pattern(r"a*bc")
    assert Regex(r"a+bc").d("ab").compare_pattern(r"c")
    assert Regex(r"[1-9]a").d("1").compare_pattern(r"a")
    assert Regex(r"[A-Z]a").d("A").compare_pattern(r"a")
    assert Regex(r"[0-9]{4}-[0-9]{2}-[0-9]{2}").d("1993-").compare_pattern(r"[0-9]{2}-[0-9]{2}")
    assert Regex(r"ab").d("ab").compare_pattern(r"")
    assert Regex(r"a+bc").d("a").compare_pattern(r"a*bc")
    assert Regex(r"a?bc").d("b").compare_pattern(r"c")

    assert Regex(r"(a|bb)c").d("b").pattern == "bc"
    #print(Regex(r"(b|bb)c").d("b").pattern)
    #assert Regex(r"(b|bb)c").d("b").compare_pattern(r"b?c")