import Filter from 'bad-words';

// const filter = new Filter();
const filter = new Filter({emptyList: true});

filter.addWords('tea', 'cakes', 'pastries', 'cake', 'pastry', 'teas');

export default filter;
