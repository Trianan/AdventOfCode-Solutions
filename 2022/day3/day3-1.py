# AoC-2022-3-(1/2)

char_list = [chr(c) for c in range(ord('a'), ord('z')+1)] + [chr(c) for c in range(ord('A'), ord('Z')+1)]
def priority(item):
    '''Items a-Z have priorities 1-52'''
    return char_list.index(item) + 1

print('\tITEM LEGEND\n\t-----------')
for item in char_list:
    print(f'Item: {item}\tPriority: {priority(item)}')

def clean_data(filename):
    '''Splits each line into a tuple of 2 even halves of a clean string'''
    data = []
    with open(filename, 'r') as raw_data:
        for line in raw_data:
            line = line.strip()
            mid_index = int(len(line)/2)
            rucksack =  [line[:mid_index], line[mid_index:], '!']
            for item in rucksack[0]:
                if item in rucksack[1]:
                    rucksack[2] = item
            data.append(rucksack)
    return data
data = clean_data('day3_input.txt')
priority_sum = 0
for entry in data:
    print(f'{entry[0]}\tLength: {len(entry[0])}\n{entry[1]}\tLength: {len(entry[1])}\nCommon item: {entry[2]}\n')
    priority_sum += priority(entry[2])

print(f'PRIORITY SUM: {priority_sum}')