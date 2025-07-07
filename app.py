import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk

# --- Setup Main Window ---
window = tk.Tk()
window.title("Doraemon Login")
window.geometry("500x700")
window.resizable(False, False)

# --- Load & Set Background Image ---
bg_image = Image.open("doraas.jpg")
bg_image = bg_image.resize((500, 700), Image.LANCZOS)
bg_photo = ImageTk.PhotoImage(bg_image)

bg_label = tk.Label(window, image=bg_photo)
bg_label.place(x=0, y=0, relwidth=1, relheight=1)

# --- Welcome Message ---
welcome_label = tk.Label(window, text="Helloooo!", font=("Comic Sans MS", 24, "bold"),
                         fg="#0047AB", bg="#ffffff")
welcome_label.place(relx=0.5, rely=0.4, anchor="center")

# --- Username Entry with Placeholder ---
username_var = tk.StringVar()

def on_entry_click(event):
    if username_entry.get() == "Enter your name":
        username_entry.delete(0, tk.END)
        username_entry.config(fg="black")

def on_focusout(event):
    if username_entry.get() == "":
        username_entry.insert(0, "Enter your name")
        username_entry.config(fg="grey")

username_entry = tk.Entry(window, textvariable=username_var, font=("Arial", 14), width=25, fg="grey")
username_entry.insert(0, "Enter your name")
username_entry.bind("<FocusIn>", on_entry_click)
username_entry.bind("<FocusOut>", on_focusout)
username_entry.place(relx=0.5, rely=0.5, anchor="center")

# --- Login Button ---
def login_action():
    name = username_entry.get().strip()
    if name == "" or name == "Enter your name":
        messagebox.showwarning("Oops!", "Please enter your name!")
    else:
        messimport tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk

# --- Main Login Window ---
def open_login_window():
    window = tk.Tk()
    window.title("Doraemon Login")
    window.geometry("500x700")
    window.resizable(False, False)

    # --- Load Background Image ---
    bg_image = Image.open("doraas.jpg")
    bg_image = bg_image.resize((500, 700), Image.LANCZOS)
    bg_photo = ImageTk.PhotoImage(bg_image)

    bg_label = tk.Label(window, image=bg_photo)
    bg_label.place(x=0, y=0, relwidth=1, relheight=1)

    # --- Welcome Text ("Helloooo!") without white background ---
    welcome_label = tk.Label(window, text="Helloooo!", font=("Comic Sans MS", 26, "bold"),
                             fg="yellow", bg="#00000000")  # Transparent background
    welcome_label.place(relx=0.5, rely=0.4, anchor="center")

    # --- Entry Box with Placeholder ---
    username_var = tk.StringVar()

    def on_entry_click(event):
        if username_entry.get() == "Enter your name":
            username_entry.delete(0, tk.END)
            username_entry.config(fg="black")

    def on_focusout(event):
        if username_entry.get() == "":
            username_entry.insert(0, "Enter your name")
            username_entry.config(fg="grey")

    username_entry = tk.Entry(window, textvariable=username_var, font=("Comic Sans MS", 14),
                              width=25, fg="grey")
    username_entry.insert(0, "Enter your name")
    username_entry.bind("<FocusIn>", on_entry_click)
    username_entry.bind("<FocusOut>", on_focusout)
    username_entry.place(relx=0.5, rely=0.5, anchor="center")

    # --- On Login Button Click: Open Welcome Page ---
    def login_action():
        name = username_entry.get().strip()
        if name == "" or name.lower() == "enter your name":
            messagebox.showwarning("Oops!", "Please enter your name!")
        else:
            window.destroy()
            open_landing_page(name)

    # --- Login Button ---
    login_button = tk.Button(window, text="Login", command=login_action,
                             font=("Comic Sans MS", 12, "bold"), bg="#00BFFF",
                             fg="white", padx=20, pady=5)
    login_button.place(relx=0.5, rely=0.57, anchor="center")

    window.mainloop()


# --- Welcome Page After Login ---
def open_landing_page(username):
    landing = tk.Tk()
    landing.title("Welcome Page")
    landing.geometry("500x700")
    landing.resizable(False, False)

    # Optional: Use same background image again
    bg_image = Image.open("doraas.jpg")
    bg_image = bg_image.resize((500, 700), Image.LANCZOS)
    bg_photo = ImageTk.PhotoImage(bg_image)

    bg_label = tk.Label(landing, image=bg_photo)
    bg_label.place(x=0, y=0, relwidth=1, relheight=1)

   from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/welcome', methods=['POST'])
def welcome():
    username = request.form['username'].strip()
    if username == "":
        username = "Friend"
    return render_template('welcome.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)
g.mainloop()


# --- Start App ---
open_login_window()
Button(window, text="Login", command=login_action,
                         font=("Arial", 12, "bold"), bg="#00BFFF", fg="white", padx=20, pady=5)
login_button.place(relx=0.5, rely=0.57, anchor="center")

# --- Launch the App ---
window.mainloop()
