import pandas as pd
import numpy as np
import re #used as a regular expression to find particular patterns and process it
import string #used to obtain information in the string and manipulate the string overall
import warnings
import re

# plotting
import seaborn as sns
import matplotlib.pyplot as plt
# nltk
import nltk #a natural language processing toolkit module associated in anaconda
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize.toktok import ToktokTokenizer
from nltk.tokenize import word_tokenize,sent_tokenize
from nltk.tokenize import RegexpTokenizer
# sklearn
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import accuracy_score
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

filename = "model.pkl"

with open("vectorizer.pkl",'rb') as v:
    X_val_tfidf = pickle.load(v)

with open(filename, 'rb') as f:
    model2 = pickle.load(f)


print("getting data from stdin")
data = input()
print(data)
df = pd.DataFrame()
df["text"] = [data]


a = model2.predict(X_val_tfidf.transform(df["text"]))
print(a[0])