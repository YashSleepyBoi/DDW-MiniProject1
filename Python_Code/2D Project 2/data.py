import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

#read our csv file
df=pd.read_csv('data/data4.csv')

df['gdp_crop_chn']=df['gdp_chn']*df['%gdp_agri_chn']
df['gdp_crop_ind']=df['gdp_ind']*df['%gdp_agri_ind']
print(df)
#functionsX
def normalize_z(df):
    dfout = df.copy()
    dfout = (df - df.mean()) / df.std()
    return dfout

def get_features_targets(df, feature_names, target_names):

    df_features = df[feature_names]

    df_target = df[target_names]
    return df_features, df_target

def prepare_feature(df_feature):
    
    cols = len(df_feature.columns)

    feature = df_feature.to_numpy().reshape(-1, cols)
    
    rows = feature.shape[0] 
    ones = np.ones((rows, 1))
    X = np.concatenate((ones, feature), axis=1)

    return X

def prepare_target(df_target):
    cols = len(df_target.columns)
    target = df_target.to_numpy().reshape(-1, cols)
    return target

def predict(df_feature, beta):
    X = prepare_feature(normalize_z(df_feature))
    return calc_linear(X, beta)

def calc_linear(X, beta):
    return np.matmul(X, beta)

def split_data(df_feature, df_target, random_state=None, test_size=0.5):
    indexes = df_feature.index
    if random_state != None:
        np.random.seed(random_state)
    k = int(test_size * len(indexes))
    test_index = np.random.choice(indexes, k, replace=False)
    indexes = set(indexes)
    test_index = set(test_index)
    train_index = indexes - test_index

    df_feature_train = df_feature.loc[train_index, :]
    df_feature_test = df_feature.loc[test_index, :]
    df_target_train = df_target.loc[train_index, :]
    df_target_test = df_target.loc[test_index, :]
    return df_feature_train, df_feature_test, df_target_train, df_target_test
  
def r2_score(y, ypred):
    rows=y.shape[0]
    ssres=0

    for i in range(y.shape[0]):
        ssres+=(y[i][0]-ypred[i][0])**2
        
    sstot=0
    
    for i in range(y.shape[0]):
        sstot+=(y[i][0]-y.mean())**2
    r2=1-(ssres/sstot)

    return r2

def mean_squared_error(target, pred):
    mse=0
    for i in range(target.shape[0]):
        print(target[i][0],pred[i][0])
        mse+=(((target[i][0]))-((pred[i][0])))**2
        
    mse=mse/target.shape[0]
    return mse

def compute_cost(X, y, beta):
    J = 0
    m = X.shape[0]
    error = calc_linear(X, beta) - y
    error_sq = np.matmul(error.T, error)
    J = (1/(2*m)) * error_sq
    J = J[0][0]
    return J
    
def gradient_descent(X, y, beta, alpha, num_iters):
    m = X.shape[0]
    J_storage = np.zeros((num_iters, 1))
    for n in range(num_iters):
        deriv = np.matmul(X.T, (calc_linear(X, beta) - y))
        beta = beta - alpha * (1/m) * deriv
        J_storage[n] = compute_cost(X, y, beta)
    
    return beta, J_storage

#china
cols=['arable_land_chn','fertilizer_consumption_chn', 'temp_chn']
df_features=df[cols]
df_target=df[['net_prod_chn']]


 # Split the data set into training and test
df_features_train, df_features_test, df_target_train, df_target_test = split_data(df_features,df_target,100,0.4)

# Normalize the features using z normalization
df_features_train_z = normalize_z(df_features_train)


# Change the features and the target to numpy array using the prepare functions
X = prepare_feature(df_features_train_z)
target = prepare_target(df_target_train)

iterations = 1500
alpha = 0.01
beta = np.zeros((4,1))

# Call the gradient_descent function
beta, J_storage = gradient_descent(X,target,beta,alpha,iterations)

# call the predict() method
pred = predict(df_features_test,beta)
y = prepare_target(df_target_test)
r2=r2_score(y, pred)
print(r2)


# #india
cols=['arable_land_ind','fertilizer_consumption_ind','temp_ind']
df_features=df[cols]
df_target=df[['net_prod_ind']]


 # Split the data set into training and test
df_features_train, df_features_test, df_target_train, df_target_test = split_data(df_features,df_target,100,0.4)

# Normalize the features using z normalization
df_features_train_z = normalize_z(df_features_train)


# Change the features and the target to numpy array using the prepare functions
X = prepare_feature(df_features_train_z)
target = prepare_target(df_target_train)

iterations = 1500
alpha = 0.01
beta = np.zeros((4,1))

# Call the gradient_descent function
beta, J_storage = gradient_descent(X,target,beta,alpha,iterations)

# call the predict() method
pred = predict(df_features_test,beta)

y = prepare_target(df_target_test)
r2=r2_score(y, pred)
print(pred)
m2=mean_squared_error(y, pred)
print(m2)


