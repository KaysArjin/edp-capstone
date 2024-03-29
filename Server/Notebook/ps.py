import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import pathlib



filename = "/Users/alessandrogagarin/Travelers/st/edp-capstone/Server/Notebook/model.pkl"
# filename = "C:\\DEMO\\edp-capstone\\Server\\Notebook\\model.pkl"

data = input()


with open("/Users/alessandrogagarin/Travelers/st/edp-capstone/Server/Notebook/vectorizer1.pkl",'rb') as v:
    X_val_tfidf = pickle.load(v)

with open(filename, 'rb') as f:
    model2 = pickle.load(f)


df = pd.DataFrame()
df["text"] = [data]


a = model2.predict(X_val_tfidf.transform(df["text"]))
print(a[0]) 




