import os
print("installed Programs in the laptop:\n")
os.system('wmic product get name,version')