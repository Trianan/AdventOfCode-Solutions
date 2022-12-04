# AoC-2022-4-(2/2)

def clean(filename):
    data = []
    with open(filename, 'r') as raw_data:
        for line in raw_data:
            line = line.strip().split(',')
            line = list(map(lambda n: list(map(int, n.split('-'))), line))
            data.append(line)
    return data

def overlapped(pair):
    '''Returns true if one member of a pair overlapped the other.'''
    first, second = pair[0], pair[1]
    if first[0] <= second[0] and first[1] >= second[0]:
        return True
    elif second[0] <= first[0] and second[1] >= first[0]:
        return True
    else:
        return False

pairs = clean('day4_input.txt')
print('\tPAIR ASSIGNMENT:\n\t----------------')
print(*pairs, sep='\n')
print(f'Pair count: {len(pairs)}\n')

total_overlapped = 0
for pair in pairs:
    print(f'{pair=}')
    if overlapped(pair):
        print('overlapped')
        total_overlapped += 1
print(f'Total overlapping pairs: {total_overlapped}')