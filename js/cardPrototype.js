function cardProto(symbol) {
    this.htmlObject = `<li class="card">
    <i class="fa fa-${symbol}"></i>
    </li>`;
    
    this.mathed = function(){
        this.htmlObject.classList.add("match");
    }
};