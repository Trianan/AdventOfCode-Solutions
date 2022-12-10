# AoC-2022-6-(2/2)

def find_marker(filename):
    buffer, slider_length = [], 14
    with open(filename, 'r') as datastream:
        buffer = list(datastream.read())
        for i in range(len(buffer)):
            slider, dupe_char, marker_end = [], False, 0

            for j in range(slider_length):
                if i + j < len(buffer):
                    char, marker_end = buffer[i + j], i + j
                    if char in slider:
                        dupe_char = True
                    slider.append(char)
                    
            if not dupe_char:
                return marker_end
            
print(f"\tMarker found at {find_marker('day6_input.txt') + 1}th character.")