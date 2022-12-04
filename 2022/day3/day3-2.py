# AoC-2022-3-(2/2)

char_list = [chr(c) for c in range(ord('a'), ord('z')+1)] + [chr(c) for c in range(ord('A'), ord('Z')+1)]
def priority(item):
    '''Items a-Z have priorities 1-52'''
    return char_list.index(item) + 1

print('\tITEM LEGEND\n\t-----------')
for item in char_list:
    print(f'Item: {item}\tPriority: {priority(item)}')

def get_groups(filename):
    '''Groups input into lists of 3 cleaned lines'''
    groups = []
    with open(filename, 'r') as raw_data:
        EOF = False
        while not EOF:
            group = []
            for i in range(0,3):
                line = raw_data.readline().strip()
                if line == '':
                    EOF = True
                else:
                    group.append(line)
            if not EOF:
                for badge in group[0]:
                    if badge in group[1] and badge in group[2]:
                        group.append(badge)
                groups.append(group)
    return groups

groups = get_groups('day3_input.txt')
badge_sum = 0
for group in groups:
    print(f'Member #1: {group[0]}\nMember #2: {group[1]}\nMember #3: {group[2]}\nBadge: {group[3]}\n')
    badge_sum += priority(group[3])
print(f'BADGE SUM: {badge_sum}')