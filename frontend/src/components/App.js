import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/Header";
import BookList from "./book/BookList";
import Book from "./book/Book";
import CategoryList from "./category/CategoryList";
import Category from "./category/Category";
import PublisherList from "./publisher/PublisherList";
import Publisher from "./publisher/Publisher";
import AuthorList from "./author/AuthorList";
import Author from "./author/Author";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={BookList} />
            <Route exact path="/books/" component={BookList} />
            <Route exact path="/book/add/" component={Book} />
            <Route exact path="/book/:id/" component={Book} />
            <Route exact path="/category/add/" component={Category} />
            <Route exact path="/category/:id/" component={Category} />
            <Route exact path="/categories/" component={CategoryList} />
            <Route exact path="/authors/" component={AuthorList} />
            <Route exact path="/author/add/" component={Author} />
            <Route exact path="/author/:id/" component={Author} />
            <Route exact path="/publishers/" component={PublisherList} />
            <Route exact path="/publisher/add/" component={Publisher} />
            <Route exact path="/publisher/:id/" component={Publisher} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;