import Button from "./Button";

const Header = ({account,connect})=>{
    function getDisplayAccount(acc){
        let str = acc[0];
        return str.substr(0,6)+"...."+str.substr(-4,4);
    }
    return(
        <div className="navbar">
            <h1>E-Voting</h1>
            
                {account==null?
                <Button text="Connect Wallet" onClick={connect}>Connect Wallet</Button>
                :<h2 className="welcomeText">Welcome <span>{getDisplayAccount(account)}</span></h2>
                }
        </div>
    );
}
export default Header;