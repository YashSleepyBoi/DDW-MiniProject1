
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df=pd.read_csv('data/data4.csv')
print(df)
df['gdp_crop_chn']=df['gdp_chn']*df['%gdp_agri_chn']
df['gdp_crop_ind']=df['gdp_ind']*df['%gdp_agri_ind']
print(df)








