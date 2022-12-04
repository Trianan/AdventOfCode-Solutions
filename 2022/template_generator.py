# Template Generator
import sys, os
day = sys.argv[1]
p1_header = f"# AoC-2022-{day}-(1/2)"
p2_header = f"# AoC-2022-{day}-(2/2)"
input_header = "Input goes here."

os.system(f'mkdir .\day{day}')
os.system(f'echo {p1_header} > day{day}\day{day}-1.py')
os.system(f'echo {p2_header} > day{day}\day{day}-2.py')
os.system(f'echo {input_header} > day{day}\day{day}_input.txt')