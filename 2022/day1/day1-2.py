# AoC-2022-1-(2/2)
def clean_data(filename):
    cleaned_data = []
    with open(filename, 'r') as raw_data:
        current_calories = 0
        for line in raw_data:
            line = line.strip()
            if line != '':
                current_calories += int(line)
            else:
                cleaned_data.append(current_calories)
                current_calories = 0
    return cleaned_data

calorie_data = clean_data('day1_input.txt')
calorie_data.sort()
for calories in calorie_data:
    print(calories)

calorie_sum = 0
for i in range(0, 3):
    calorie_sum += calorie_data.pop()

print(f'Sum of top-3 calorie counts: {calorie_sum}')