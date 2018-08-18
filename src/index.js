import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {moviesData} from './moviesData'

import registerServiceWorker from './registerServiceWorker';

const movie = {
	title: "Same title",
	vote_average: 8.5,
	image: "https://yt3.ggpht.com/a-/ACSszfGI5u0sRXLN8hcJLxefC0IUyyXt5zK4LmqvkA=s900-mo-c-c0xffffffff-rj-k-no",
	overview: "It's a magic 0_o"
};

function  Image(props) {
	const {path, alt} = props;
	const fullPath = `https://image.tmdb.org/t/p/w500${path}`;
	return (
		<img
			className="card-img-top"
			src={fullPath}
			alt={alt}
		/>
	)
}


class MovieApp extends React.Component {
	constructor(){
		super();
		this.state = {
			willWatchList: [],
		}
	};

	willWatchHandler(title, id){
		const { willWatchList }  = this.state;
		let deleteIndex = null;

		willWatchList.map((elem, index) => {
			if (elem.id === id) {
				deleteIndex = index;
			}
		});

		if (deleteIndex != null) {
			let copyArray = [...this.state.willWatchList]
			copyArray.splice(deleteIndex,1);
			this.setState({
				willWatchList: copyArray
			});
		} else {
			const film = {
				name: title,
				id: id
			};
			this.setState(prevState => ({
				willWatchList: [...prevState.willWatchList, film]
			}))
		}
	};
	render(){
		const { willWatchList } = this.state;
		return(
			<div className="container">
				<div className="row mt-4">
					<div className="col-8">
						<MovieList
							willWatch={(title, id) => this.willWatchHandler(title, id)}
						/>
					</div>
					<div className="col-4">
						<WillWatch willWatchList={willWatchList}/>
					</div>
				</div>
			</div>
		)
	}
}

class WillWatch extends React.Component {
	constructor(){
		super();
		this.state = {
			fimlAmount: 0
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			filmAmount: nextProps.willWatchList.length
		})
	}

	render() {
		const { filmAmount } = this.state;
		const { willWatchList } = this.props;
		return (
			<div>
				<h2>Will Watch: { filmAmount > 0 ? filmAmount : '' }</h2>
				<ul className="list-group">
					{willWatchList.map(function(film, index){
						const { name, id } = film;
						return <li className='list-group-item' key={index}>{name}</li>
					})}
				</ul>
			</div>
		)
	}
}


class MovieList extends React.Component {
	constructor(){
		super();
		this.state = {
			data: moviesData
		}
	}

	willWatchHandler = (title, id) => {
		const {willWatch} = this.props;
		willWatch(title, id);
	};

	render(){
		const data = this.state.data;
		const self = this;
		return (
			<div className="container">
				<div className="row">
					{ data.map(function(item, index){
						return (
							<MovieItem
								data={item}
								key={index}
								willWatch={(title, id) => self.willWatchHandler(title, id)}
							/>
						)
					})}
				</div>
			</div>
		)
	}
}

class MovieItem extends React.Component {
	constructor(){
		super();
		this.state = {
			show: true,
			willWatch: false,
		}
	}

	willWatchHandler = (event, title, id) => {
		this.setState({
			show: !this.state.show,
			willWatch: !this.state.willWatch
		});
		const { willWatch } = this.props;
		willWatch(title, id);
	};
	render(){
		const { data: { title, id, vote_average, overview, backdrop_path} } = this.props;
		return (
			<div className="col-4 mb-4">
				<div className='card'>
					<Image path={backdrop_path} alt={title}/>
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<div className="d-flex justify-content-between align-items-center">
							<p className="mb-0">Rating: {vote_average}</p>
							<button
								className={ this.state.willWatch ? 'btn btn-success': 'btn btn-secondary' }
								onClick={ (event) => this.willWatchHandler(event, title, id)}
							>
								Will watch
							</button>
						</div>
						{/*{this.state.show ? <p>{overview}</p>: null}*/}
					</div>
				</div>
			</div>
		)
	}

}

function App(){
	return <MovieApp />
}

// function App()

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();