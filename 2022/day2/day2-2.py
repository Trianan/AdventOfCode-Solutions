# AoC-2022-2-(2/2)
CHOICES = ['rock', 'paper', 'scissors']

def decrypt(filename):
    '''Formats raw data lines into pairs of corresponding RPS choices.'''
    clean_data = []
    with open(filename, 'r') as raw_data:
        SYMBOLS = [
            ('A', 'rock'), 
            ('B', 'paper'), 
            ('C', 'scissors'), 
            ('X', 'lose'), 
            ('Y', 'tie'), 
            ('Z', 'win')
        ]
        for line in raw_data:
            line.split()
            clean_line = []
            for symbol in line:
                for key in SYMBOLS:
                    if symbol == key[0]:
                        clean_line.append(key[1])
            match clean_line[1]:
                case 'win':
                    clean_line[1] = CHOICES[(CHOICES.index(clean_line[0]) + 1) % len(CHOICES)]
                case 'tie':
                    clean_line[1] = clean_line[0]
                case other:
                    clean_line[1] = CHOICES[(CHOICES.index(clean_line[0]) - 1) % len(CHOICES)]    
            clean_data.append(clean_line)
    return clean_data  # Returns (opponent choice, determined strategy)

def get_scores(opponent, player):
    '''Returns dict of outcome of single round, according to AoC rules.'''
    p_index, o_index = CHOICES.index(player), CHOICES.index(opponent)
    scores = {
        'choices': f'(opponent:{opponent}, player:{player})',
        'outcome': '?',
        'player_score':p_index + 1,
        'opponent_score':o_index + 1
    }
    if p_index == o_index+1 or (p_index == 0 and o_index == len(CHOICES)-1):
        scores['outcome'] = 'win'
        scores['player_score'] += 6
    elif p_index == o_index:
        scores['outcome'] = 'tie'
        scores['player_score'] += 3
        scores['opponent_score'] += 3
    else:
        scores['outcome'] = 'loss'
        scores['opponent_score'] += 6
    return scores

data = decrypt('day2_input.txt')
total_score = 0
for entry in data:
    round_outcome = get_scores(entry[0], entry[1])
    print(round_outcome)
    total_score += round_outcome['player_score']

print(f'\nENTRY COUNT: {len(data)}\nTOTAL SCORE: {total_score}\n')