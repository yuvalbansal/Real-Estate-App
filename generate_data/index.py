import random
import json

# Define options
locations = ["Mumbai", "Bengaluru", "Delhi", "Gurgaon"]
sizes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"]

# Function to generate random price between 50 lakhs and 3 crore rupees
def generate_price(size):
    return (round(random.randrange(30, 80)) * 100000) if size == "1 BHK" else \
           (round(random.randrange(50, 150)) * 100000) if size == "2 BHK" else \
           (round(random.randrange(100, 250)) * 100000) if size == "3 BHK" else \
           (round(random.randrange(150, 300)) * 100000) if size == "4 BHK" else 0

# Generate 10 random house listings
houses = []
for _ in range(10):
    location = random.choice(locations)
    size = random.choice(sizes)
    price = generate_price(size)
    house = {
        "location": location,
        "size": size,
        "price": price
    }
    print(house)
    houses.append(house)

# Save to JSON file
with open("../public/src/houses.json", "w") as f:
    json.dump(houses, f, indent=2)

print("Generated and saved 10 random house listings to 'houses.json'")
