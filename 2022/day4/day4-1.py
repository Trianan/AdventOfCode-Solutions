# AoC-2022-4-(1/2)

def clean(filename):
    data = []
    with open(filename, 'r') as raw_data:
        for line in raw_data:
            line = line.strip().split(',')
            line = list(map(lambda n: list(map(int, n.split('-'))), line))
            data.append(line)
    return data

def contained(pair):
    '''Returns true if one member of a pair completely contained the other.'''
    first, second = pair[0], pair[1]
    if first[0] <= second[0] and first[1] >= second[1]:
        return True
    elif second[0] <= first[0] and second[1] >= first[1]:
        return True
    else:
        return False

pairs = clean('day4_input.txt')
print('\tPAIR ASSIGNMENT:\n\t----------------')
print(*pairs, sep='\n')
print(f'Pair count: {len(pairs)}\n')

total_contained = 0
for pair in pairs:
    print(f'{pair=}')
    if contained(pair):
        print('contained')
        total_contained += 1
print(f'Total containing pairs: {total_contained}')