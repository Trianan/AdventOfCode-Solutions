# AoC-2022-5-(1/2)
def clean(filename):
    data = {
        'crates': [],
        'procedure': []
    }
    with open(filename, 'r') as raw_data:
        reading_init_arrangement = True
        for line in raw_data:
            clean_line = []
            if reading_init_arrangement:
                for i in range(len(line)):
                    if (i - 1) % 4 == 0:
                        clean_line.append(line[i])
                if clean_line == []:
                    reading_init_arrangement = False
                else:
                    if data['crates'] == []:
                        for i in range(len(clean_line)):
                            data['crates'].append([])
                    for i in range(len(clean_line)):
                        if clean_line[i].isalpha():
                            data['crates'][i].insert(0, clean_line[i])
            else:
                line = line.strip().split()
                for word in line:
                    if word.isdigit():
                        clean_line.append(int(word))
                data['procedure'].append(clean_line)
    return data

def parse_instructions(instruction, crates):
    for i in range(instruction[0]):
        crate = crates[instruction[1]-1].pop()
        crates[instruction[2]-1].append(crate)
    print(*crates, sep='\n')
    print('\n')

data = clean('day5_input.txt')
print('\n\tINITIAL CRATES:')
print(*data['crates'], sep='\n')
print('\n\tPROCEDURE:')
print(*data['procedure'], sep='\n')
print('\n\tExecuting instructions...')
for instruction in data['procedure']:
    parse_instructions(instruction, data['crates'])

final_arrangement = []
for stack in data['crates']:
    final_arrangement.append(stack[-1])
final_arrangement = ''.join(final_arrangement)
print(f'\tFINAL ARRANGEMENT: {final_arrangement}')