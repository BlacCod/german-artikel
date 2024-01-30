new = open("nouns.csv", "a")
with open("assets/nouns.txt") as file:
    for line in file:
        arr = line.split("\t")
        new.write(";".join(arr[0:len(arr) - 1]) + "\n")
