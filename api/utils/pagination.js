

class Pagination{

    contructor(page=0,limit=10,total=0,totalPages=0){
        this.pagination = {
            page:page,
            limit:limit,
            total:total,
            totalPages:0,
            hasNext:false,
            hasPrev:false}
    }

    
    set total(total){
        
        this.pagination.total = total;
    }

    

    get pagination(){
        return this.pagination;
    }
    
    
    
}


