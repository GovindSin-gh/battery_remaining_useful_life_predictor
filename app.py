import pickle
from flask import Flask,request,jsonify,render_template

app = Flask(__name__)

ridge_model = pickle.load(open('models/ridge.pkl','rb'))
standard_scaler = pickle.load(open('models/scaler.pkl','rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/predict",methods = ["POST"])
def predict():
    data = request.get_json()
    data_list = list(data.values())
    print(data_list)
    try:
        cycle_index = int(data_list[0])
        if(cycle_index<1 or cycle_index>1134):
            raise Exception()
    except:
        return jsonify({'brul':-1})
    try:
        f1 = float(data_list[1])
        if(f1<8.690000 or f1>958320.370000):
            raise Exception()
    except:
        return jsonify({'brul':-2})
    try:
        f2 = float(data_list[2])
        if(f2<-397645.908000 or f2>406703.768000):
            raise Exception()
    except:
        return jsonify({'brul':-3})
    try:
        f3 = float(data_list[3])
        if(f3<3.043000 or f3>4.363000):
            raise Exception()
    except:
        return jsonify({'brul':-4})
    try:
        f4 = float(data_list[4])
        if(f4<3.022000 or f4>4.379000):
            raise Exception()
    except:
        return jsonify({'brul':-5})
    try:
        f5 = float(data_list[5])
        if(f5<-113.584000 or f5>245101.117000):
            raise Exception()
    except:
        return jsonify({'brul':-6})
    try:
        f6 = float(data_list[6])
        if(f6<5.980000 or f6>880728.100000):
            raise Exception()
    except:
        return jsonify({'brul':-7})
    try:
        f7 = float(data_list[7])
        if(f7<5.980000 or f7>880728.100000):
            raise Exception()
    except:
        return jsonify({'brul':-8})
    new_data_scaled = standard_scaler.transform([[cycle_index,f1,f2,f3,f4,f5,f6,f7]])
    result = ridge_model.predict(new_data_scaled)
    return jsonify({'brul':int(result)})

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)

