# Template Generator
import sys, os
day = sys.argv[1]
file_extension = sys.argv[2]

def comment_symbol(language):
    DBL_SLASH = [
        '.js',
        '.cpp',
        '.c',
        '.rs',
    ]
    DBL_HYPHEN = [
        '.hs'
    ]
    POUND = [
        '.rb',
        '.py',
    ]
    SEMICOLON = [
        '.rkt'
    ]
    match language:
        case language if language in DBL_SLASH:
            return '//'
        case language if language in DBL_HYPHEN:
            return '--'
        case language if language in POUND:
            return '#'
        case language if language in SEMICOLON:
            return ';'
        case other:
            return ''

p1_header = f"{comment_symbol(file_extension)} AoC-2022-{day}-(1/2)"
p2_header = f"{comment_symbol(file_extension)} AoC-2022-{day}-(2/2)"
input_header = "Input goes here."

os.system(f'mkdir .\day{day}')
os.system(f'echo {p1_header} > day{day}\day{day}-1{file_extension}')
os.system(f'echo {p2_header} > day{day}\day{day}-2{file_extension}')
os.system(f'echo {input_header} > day{day}\day{day}_input.txt')