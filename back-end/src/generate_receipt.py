from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch

def generate_receipt(data, filename): 
    c = canvas.Canvas(filename, pagesize=letter)

    c.setFont("Helvetica", 12)

    c.drawString(1 * inch, 10.5 * inch, "Company Name")
    c.drawString(1 * inch, 10 * inch, "Address Line 1")
    c.drawString(1 * inch, 9.5 * inch, "Address Line 2")

    y = 8.5 * inch
    c.drawString(1 * inch, y, "Receipt No.: " + data["receipt_no"])
    c.drawString(1 * inch, y - 0.2 * inch, "Date: " + data["date"])
    c.drawString(1 * inch, y - 0.4 * inch, "Customer: " + data["customer"])

    y -= 1 * inch
    c.drawString(1 * inch, y, "Item")
    c.drawString(4 * inch, y, "Quantity")
    c.drawString(5 * inch, y, "Price")
    c.drawString(6 * inch, y, "Total")
    y -= 0.2 * inch

    total = 0
    for item in data["items"]:
        c.drawString(1 * inch, y, item["name"])
        c.drawString(4 * inch, y, str(item["quantity"]))
        c.drawString(5 * inch, y, str(item["price"]))
        c.drawString(6 * inch, y, str(item["quantity"] * item["price"]))
        y -= 0.2 * inch
        total += item["quantity"] * item["price"]

    c.drawString(5 * inch, y, "Total:")
    c.drawString(6 * inch, y, str(total))

    c.save()

data = {
    "receipt_no": "12345",
    "date": "2023-12-29",
    "customer": "John Doe",
    "items": [
        {"name": "Product 1", "quantity": 2, "price": 10.0},
        {"name": "Product 2", "quantity": 1, "price": 15.0},
    ]
}

generate_receipt(data, "receipt.pdf")