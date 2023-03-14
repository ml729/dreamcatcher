import re

EFF_SHORT = "public/eff_short.txt"
EFF_LONG = "public/eff_long.txt"
EFF_FULL = "public/eff_full.txt"


def first_letter(text):
    match = re.search("[a-zA-Z]", text)
    if match: return match.start()
    return -1


def remove_numbers(text_list):
    return [t[first_letter(t):] for t in text_list]


with open(EFF_SHORT, "r") as fs, open(EFF_LONG, "r") as fl, \
     open(EFF_FULL, "w+") as ff:
    es = fs.read().split("\n")
    el = fl.read().split("\n")
    es_proc = remove_numbers(es)
    el_proc = remove_numbers(el)
    ff.write("\n".join(es_proc + el_proc))
