import pandas as pd
df=pd.read_csv('data/crop_chn.csv')
df1=pd.read_csv('data/crop_ind.csv')
def sumprod_chn(year):
    z=df.loc[(df['Year Code'] == year)]
    sumyr=0
    for i in z['Value']:
        sumyr+=i
    print (sumyr)

def sumprod_ind(year):
    z=df1.loc[(df1['Year Code'] == year)]
    sumyr=0
    for i in z['Value']:
        sumyr+=i
    print (sumyr)

for i in range(1961,2021):
    sumprod_ind(i)


