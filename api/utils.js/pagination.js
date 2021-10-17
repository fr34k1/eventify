

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



const _pagination=(page,total,limit)=>{
    const tpages = total > limit ? Math.ceil(total/limit):1;
    return { 
        total:total,
        limit:limit ? limit : 10,
        page:page ? page :1,
        totalPages:tpages ,
        hasNext:page<=tpages ? true: false,
        hasPrev:page==0 ? true :false
    }
    
}

export default _pagination;