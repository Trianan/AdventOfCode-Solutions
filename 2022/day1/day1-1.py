# AoC-2022-1-(1/2)
def clean_input(filename):
    clean_input = []
    with open(filename, 'r') as raw_input:
        current_cal_total = 0
        for line in raw_input:
            line = line.strip()
            if line != '':
                current_cal_total += int(line)
            else:
                clean_input.append(current_cal_total)
                current_cal_total = 0
    return clean_input

input = clean_input('day1_input.txt')

max_calories = 0
for cal_count in input:
    print(cal_count)
    if cal_count > max_calories:
        max_calories = cal_count

print(f'MAX CALORIES: {max_calories}')