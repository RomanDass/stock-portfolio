class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: 'Feetbook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130,
        },
        {
          name: 'Yamazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500,
        },
        {
          name: 'Snoozechat',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3,
        }
      ],
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice();
    portfolio.splice(index, 1);
    this.setState({ portfolio })
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice();
    const { name, value } = event.target;
    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  }

  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();
    portfolio.push(this.state.form);
    this.setState({
      portfolio,
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    });
  }

  render() {
    const {
      portfolio,
      form,
    } = this.state;

    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
    
    return (
      <div className="container">
        <h1 className="title">Stock Portfolio</h1>
        <hr></hr>
        <div className="labels row">
          <div className="col">Name</div>
          <div className="col">Shares Owned</div>
          <div className="col">Cost Per Share ($)</div>
          <div className="col">Market Price ($)</div>
          <div className="col">Market Value ($)</div>
          <div className="col">Unrealized Gain/Loss ($)</div>
          <div className="col blank"></div>
        </div>
        <hr></hr>
        {portfolio.map((stock, index) => {
          const {
            name,
            shares_owned,
            cost_per_share,
            market_price,
          } = stock;

          const market_value = shares_owned * market_price;
          const unrealized_gain_loss = market_value - shares_owned * cost_per_share

          return (
            <div className="stock-r row">
              <div className="col stock-name" id="name-1">{name}</div>
              <input name="shares_owned" type="number" className="col stock-owned" value={shares_owned} onChange={e => this.handleChange(e, index)}/>
              <input name="cost_per_share" type="number" className="col stock-cost" value={cost_per_share} onChange={e => this.handleChange(e, index)}/>
              <input name="market_price" type="number" className="col stock-m-price" value={market_price} onChange={e => this.handleChange(e, index)}/>
              <div id="m-value-1">{market_value}</div>
              <div id="gain-loss-1">{unrealized_gain_loss}</div>
              <button id="remove-btn-1" onClick={() => this.removeStock(index)}>remove</button>
            </div>
          )
        })}
        <form className="add-item row" onSubmit={this.addStock}>
            <input name="name" type="text" id="add-name" placeholder="Name" value={form.name} onChange={this.handleFormChange} required/>
            <input name="shares_owned" type="number" id="add-shares" placeholder="Shares" value={form.shares_owned} onChange={this.handleFormChange} />
            <input name="cost_per_share" type="number" id="add-cost" placeholder="Cost" value={form.cost_per_share} onChange={this.handleFormChange} />
            <input name="market_price" type="number" id="add-price" placeholder="Price" value={form.market_price} onChange={this.handleFormChange} /> 
            <button id="add-button">add</button>
        </form>
        <div className="total row">
          <div className="port-val">Portfolio value: ${portfolio_market_value}</div>
          <div className="port-net">Portfolio gain/loss: ${portfolio_gain_loss}</div>
        </div>
      </div>
    )
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Portfolio />);