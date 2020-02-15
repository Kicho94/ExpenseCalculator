import React from 'react'
import Header from '../Header/Header'
import TableE from '../Tables/TableE'
import './expenses.css'


export default class Expenses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            vMonth : 'Choose Month',
            dataY : [],
            data : {},
            totalExpense : undefined,
            vYear : 'Choose Year',
            style : [],
            boolean : false
        }       
            }
    totalExpense = () => {
        var totalExpenses = 0
        for(let i = 0; i < this.state.data.length; i++){
            totalExpenses += this.state.data[i].product_price
        }
        this.setState({totalExpense : totalExpenses})
        //funkcija sto sumira ceni
    } 


    changeV = (event) => {
        
        this.setState({vMonth : [ event.target.value ]}, this.getSortedDate);
       
       
    }
    changeVY = (event) => {
        
        this.setState(
            {vYear : [event.target.value]}, this.getSortedDate)
    }  
    changeVY1 = (event) => {
            
            this.setState(
                {
                vYear : [event.target.value]},
                () => {
                    if(this.state.vYear == 'all'){
                    this.getAlldata()
                    }else {
                    this.getDateByYear1()
                }
                })
    }         
        
    getDateByYear = () => {
        
        this.setState({style : ''})
        var yearNumber = Number(this.state.vYear) + 1
        yearNumber = yearNumber.toString()
        
        const dateStart = new Date(`${this.state.vYear}-1-1`).getTime()
        const dateEnd = new Date(`${yearNumber}-1-1`).getTime()
        

        fetch(`http://127.0.0.1:8080/api/v1/products?purchase_date_from=${dateStart}&purchase_date_to=${dateEnd}`,
        {
            method : 'GET',
            headers :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => response.json())
        .then((data)=> {
            for(let i = 0; i < data.length; i++){
                if(this.state.style.indexOf(new Date(data[i].purchase_date).getMonth()+1) == -1){
                     this.setState({style : [...this.state.style, new Date(data[i].purchase_date).getMonth()+1 ]})
                }
            } 
            
        })
        .catch(err=>console.log(err))
    }
    getDateByYear1 = () => {
        
        var yearNumber = Number(this.state.vYear) + 1
        yearNumber = yearNumber.toString()
        
        const dateStart = new Date(`${this.state.vYear}-1-1`).getTime()
        const dateEnd = new Date(`${yearNumber}-1-1`).getTime()
        

        fetch(`http://127.0.0.1:8080/api/v1/products?purchase_date_from=${dateStart}&purchase_date_to=${dateEnd}`,
        {
            method : 'GET',
            headers :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => response.json())
        .then((data)=> {
            this.setState({data:data}, this.totalExpense)
            
        })
        .catch(err=>console.log(err))
        
    }
    

    getSortedDate = () =>{  
        
        //funkcija koja zema sortirana data za odreden mesec i godina
        let monthTo = Number(this.state.vMonth) + 1
        monthTo = monthTo.toString()
        const dateStart = new Date(`${this.state.vYear}-${this.state.vMonth}-1`).getTime()
        let dateEnd = new Date(`${this.state.vYear}-${monthTo}-1`).getTime()
        if(monthTo === '13'){
            dateEnd = new Date(`${(Number(this.state.vYear) + 1)}-1-1`).getTime()
        }
        fetch(`http://127.0.0.1:8080/api/v1/products?purchase_date_from=${dateStart}&purchase_date_to=${dateEnd}`,
        {
            method : 'GET',
            headers :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => response.json())
        .then((data)=> {
            this.setState({data : data})
            this.totalExpense()
            this.getDateByYear()
        })
        // .then(()=> {this.setState({style : ''})})
        .catch(err=> console.log(err))
        
        
       
    }


    getAlldata = () => {
    
        fetch('http://127.0.0.1:8080/api/v1/products?sort=purchase_date:-1',
    {
        method : 'get',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
    }
    )
    .then(response => response.json())
    .then((data)  => {
        this.setState({data : data}, ()=> {if(this.state.boolean === false){ this.setState({data : {}})}})
        this.totalExpense()
        for(let i = 0; i < data.length; i++){
        if(this.state.dataY.indexOf(data[i].purchase_date.substring(0,4)) == -1)
               this.setState({dataY : [...this.state.dataY, data[i].purchase_date.substring(0,4)]})
    }
    
    })
    .catch(err => console.log(err))
   
    }
    
       
     
    
    yearlyFunction = () => {
        // this.getAlldata()
        this.setState({boolean : true});
        this.setState({vYear: ""});
        this.setState({data : {}})
        this.setState({totalExpense: undefined})
        

    }
    componentDidMount(){
        this.getAlldata()
    }

    render() {
        
      var yearOption = null
       if(this.state.dataY.length > 0) {  
       yearOption = this.state.dataY.map(element => {
      return <option value={element}>{element}</option>
      })
    } 

    var monthlyM = null
    var monthlyY = null
    var yearly = null
    if(!this.state.boolean){
     monthlyM =
            <div className="filter">                     
                    <p>Choose Month: </p> 
                        <select value={this.state.vMonth} onChange={this.changeV} disabled={this.state.vYear === "Choose Year" || this.state.vYear.indexOf("Choose Year") > -1 ?  true :  false}>
                                <option value="Choose Month" className={1==1 ? "red" : "green"}>Choose Month</option>
                                <option value="1" className={this.state.style.indexOf(1) > -1 ? "green" : null} disabled={this.state.style.indexOf(1) > -1 ? false : true}>January</option>
                                <option value="2" className={this.state.style.indexOf(2) > -1 ? "green" : null} disabled={this.state.style.indexOf(2) > -1 ? false : true}>February</option>
                                <option value="3" className={this.state.style.indexOf(3) > -1 ? "green" : null} disabled={this.state.style.indexOf(3) > -1 ? false : true}>March</option>
                                <option value="4" className={this.state.style.indexOf(4) > -1 ? "green" : null} disabled={this.state.style.indexOf(4) > -1 ? false : true}>April</option>
                                <option value="5" className={this.state.style.indexOf(5) > -1 ? "green" : null} disabled={this.state.style.indexOf(5) > -1 ? false : true}>May</option>
                                <option value="6" className={this.state.style.indexOf(6) > -1 ? "green" : null} disabled={this.state.style.indexOf(6) > -1 ? false : true}>June</option>
                                <option value="7" className={this.state.style.indexOf(7) > -1 ? "green" : null} disabled={this.state.style.indexOf(7) > -1 ? false : true}>July</option>
                                <option value="8" className={this.state.style.indexOf(8) > -1 ? "green" : null} disabled={this.state.style.indexOf(8) > -1 ? false : true}>August</option>
                                <option value="9" className={this.state.style.indexOf(9) > -1 ? "green" : null} disabled={this.state.style.indexOf(9) > -1 ? false : true}>September</option>
                                <option value="10" className={this.state.style.indexOf(10) > -1 ? "green" : null} disabled={this.state.style.indexOf(10) > -1 ? false : true}>October</option>
                                <option value="11" className={this.state.style.indexOf(11) > -1 ? "green" : null} disabled={this.state.style.indexOf(11) > -1 ? false : true}>November</option>
                                <option value="12" className={this.state.style.indexOf(12) > -1 ? "green" : null} disabled={this.state.style.indexOf(12) > -1 ? false : true}>December</option>
                        </select>  
            </div> 
     monthlyY = 
            <div className="filter">                     
                    <p>Choose Year: </p>
                        <select value={this.state.vYear} onChange={this.changeVY}>
                                <option value="Choose Year">Choose Year</option>
                                {yearOption}
                        </select>  
            </div> 
            }
        else if(this.state.boolean){
            yearly = <div className="filter">                     
            <p>Choose Year: </p>
                <select value={this.state.vYear} onChange={this.changeVY1}>
                        <option value="Choose Year">Choose Year</option>
                        <option value="all">All</option>
                        {yearOption}
                </select>  
    </div> 
        } 



        return (<React.Fragment> 
                <div id="products-container">
             <Header />
<div id="products-background">
                <div className="products-header">            
                         <h1>Expenses</h1>
                </div>  
        <div className="expenses-header">
                    <div className="buttons-div">
                         <button className={this.state.boolean ? "mont-yearU" : "mont-year"} onClick ={()=>{this.setState({boolean : false, data : {}, vYear : "Choose Year", style : [], totalExpense : 0})}}>MONTHLY</button>
                         <button className={this.state.boolean ? "mont-year" : "mont-yearU"} onClick={this.yearlyFunction}>YEARLY</button>
                    </div>  
                    
            {monthlyM}
            {monthlyY}
            {yearly} 
        </div> 
                 <br/>
                 
            <TableE data={this.state.data} vMonth={this.state.vMonth} vYear={this.state.vYear} boolean={this.state.boolean}/>
            </div>           
           </div>
           <div className="expenses-footer">
                <div className="expenses-footerh1">
                    <h1>
                    Total spent : {this.state.totalExpense} den.
                    </h1>
                </div>
                </div>     
        </React.Fragment>
        )
    }
}



