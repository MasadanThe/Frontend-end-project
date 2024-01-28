import { Book } from "@/model/book";
import axios from "axios";

 const getBooks = async (search: string): Promise<Array<Book>> =>{
  let resp = new Array<Book>;
  //If we are searching for something, get the books according to search
    if(search != ""){
      let linkSearch = "http://localhost:3000/library/books/search?q=" + search;
      let axiosRespSearch = await axios.get(linkSearch);
      resp = axiosRespSearch.data;
    }

    //If we are not searching for something, get all books
    else{
      let linkBook = "http://localhost:3000/library/books";
      let axiosRespBooks = await axios.get(linkBook);
      resp = axiosRespBooks.data;
      console.log(resp);
    }
     return resp;
  }

  const buyBook = async (title: string, quantity:number) =>{
     let linkBuyBook = "http://localhost:3000/library/user/books";
      let axiosRespSearch = await axios.post(linkBuyBook,
          {
          "title": title,
          "quantity": quantity
            },

          {
              headers:
                  {
                      'Authorization': sessionStorage.token
                  }
          });
  }

const deleteBook = async (title: string) =>
{
    let linkDeleteBook = "http://localhost:3000/admin/books";
    let axiosRespSearch = await axios.delete(linkDeleteBook,
        {
            headers: {
                'Authorization': sessionStorage.token

            },
            data:{
                "title": title
            }

        });
}

const editBook = async (oldTitle: string, title: string, author: string, quantity: number) =>{
    let linkDeleteBook = "http://localhost:3000/admin/books";
    let axiosRespSearch = await axios.put(linkDeleteBook,
        {
                "previous": {"title": oldTitle},
                "current": {"title": title, "author": author, "quantity": quantity}
            },
        {
            headers: {
                'Authorization': sessionStorage.token
            }
        });
}

const addBook = async (title: string, author: string, quantity: number) =>{
    let linkDeleteBook = "http://localhost:3000/admin/books";
    let axiosRespSearch = await axios.post(linkDeleteBook,
        {
            "title": title,
            "author": author,
            "quantity": quantity
        },
        {
            headers: {
                'Authorization': sessionStorage.token
            }
        });
}



const bookService = { getBooks, buyBook, deleteBook, editBook, addBook};
export default bookService
{
    
};

