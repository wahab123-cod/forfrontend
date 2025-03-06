<template>
    <div class="container">
          <h2>Sales Tax Calculator</h2>
    
      <div class="input-group">
        <label>Total Sales Amount ($):</label>
        <input type="number" v-model="salesAmount" placeholder="Enter sales amount" />
      </div>
    
      <div class="input-group">
        <label>Tax Rate (%):</label>
        <input type="number" v-model="taxRate" placeholder="Enter tax percentage" />
      </div>
    
      <button @click="calculateTax">Calculate</button>
    
      <div v-if="totalAmount !== null" class="result">
        <p>Sales Tax: ${{ salesTax }}</p>
        <p><strong>Total Amount After Tax: ${{ totalAmount }}</strong></p>
    
      </div>
    </div>
  </template>
    
  <script>
export default {
    data() {
      return {
        salesAmount: "",
        taxRate: "",
        salesTax: 0,
        totalAmount: null,
      };
    },
    methods: {
      calculateTax() {
        if (this.salesAmount && this.taxRate) {
          this.salesTax = (this.salesAmount * this.taxRate) / 100;
          this.totalAmount = parseFloat(this.salesAmount) + this.salesTax;
        } else {
          alert("Please enter valid values for sales amount and tax rate.");
        }
      },
    },
  };
</script>

<style scoped>
    .container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    background: #f9f9f9;
  }
  
    .input-group {
    margin-bottom: 15px;
  } 
  
    label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .result {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  </style>