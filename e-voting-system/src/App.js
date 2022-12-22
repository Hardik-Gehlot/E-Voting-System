import './App.css';
import {useState} from 'react';
import Header from './components/Header';
import { connectWeb3Metamask } from './web3-functions';
import Section from './components/Section';

function App() {
  const [contractInstance, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  async function connect() {
    try {
      let {accounts, instance} = await connectWeb3Metamask();
      setAccounts(accounts);
      setContract(instance);
    }catch(error){
      alert('Failed to load contract');
      console.log(error);
    }
  }
  return (
    <div className="App">
      <Header account={accounts} connect={connect}></Header>
      {contractInstance==null?"":
      <Section contractInstance={contractInstance} accounts={accounts}></Section>}
    </div>
  );
}

export default App;
