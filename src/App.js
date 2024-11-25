import React, { useState } from 'react';
import './App.css';

function App() {
  //stateの設定
  const [input, setInput] = useState("0"); //現在の入力値
  const [result, setResult] = useState("0"); //計算結果

  //数値のボタンがクリックされた時の処理
  const handleNumberClick = (value) => {
    setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
  }; //prevInputの値が0だったら、valueに置き換え、0でなかったらvalueを追加

  // 四則演算子のボタンがクリックされた時の処理
  const handleOperatorClick = (operator) => {
    if(input.slice(-1) !== operator) {
      setInput((prevInput) => prevInput + operator);
    }
  };

  // 小数点のボタンがクリックされた時の処理
  const handleDecimalClick = () => {
    setInput((prevInput) => (prevInput.includes(".") ? prevInput : prevInput + "."));
  }; //現在の入力値に小数点が含まれているか確認。小数点が含まれていなければ、小数点を追加

  // バックスペースのボタンがクリックされた時の処理
  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, prevInput.length - 1));
  }; //最後の値を削除

  // クリアのボタンがクリックされた時の処理
  const handleClear = () => {
    setResult(0);
    setInput("0");
  }; //結果と表示の値を0にする

  // 計算のボタンがクリックされた時の処理
  const handleCalculate = () => {
    try {
      const calculatedResult = evaluateExpression(input);
      setInput(calculatedResult.toString()); //計算結果を文字列として変数に保持
      setResult(calculatedResult); //計算結果を値として変数に保持
    } catch (error) {
      setInput("エラー：" + error.message);
      setResult("エラー");
    } //エラーが出た時、メッセージを表示
  };

  //四則演算を評価する関数
  const evaluateExpression = (expression) => {
    //不正な文字を取り除く
    const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');  //正規表現
    //評価
    const result = eval(sanitizedExpression);

    if (Number.isInteger(result)) {
      return result; // 整数の場合は ".0" を表示せずにそのまま返す
    } else {
      return result.toFixed(2); // 小数点以下2桁で表示
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="input-container">
          <input type="text" value={input} readOnly />
          <button className="backspace-button" onClick={handleBackspace}>
            &#9003;
          </button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button className="operator-button" onClick={() => handleOperatorClick("+")}>+</button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button className="operator-button" onClick={() => handleOperatorClick("-")}>-</button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button className="operator-button" onClick={() => handleOperatorClick("*")}>*</button>
        </div>
        <div>
          <button onClick={() => handleNumberClick("0")}>0</button>
          <button className="clear-button" onClick={handleClear}>
            C
          </button>
          <button className="operator-button" onClick={handleDecimalClick}>.</button>
          <button className="operator-button" onClick={handleCalculate}>=</button>
        </div>
      </div>
    </div>
  );

}

export default App;
