
import React, { Component } from 'react';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import StarIcon from '@material-ui/icons/Star';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { connect } from 'react-redux';
import refreshMoviesAction from './RefreshMoviesAction';


class VerticalTimelineDisplay extends Component {

    state = {release_date_after: "2015-01-01"};

    updateMovies(params = {release_date_after: this.state.release_date_after}) {

        const { refreshMovies } = this.props;

        //dispatch action to refresh movies
        refreshMovies(params);

    }

    componentDidMount() {
        this.updateMovies();
    }

    render() {
        return (
            <VerticalTimelineComponent {...this.props} {...this.state} />
        );
    }
}


  //<VerticalTimelineElement
    //className="vertical-timeline-element--work"
    //date="2010 - 2011"
    //iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //icon={<WorkIcon />}
  //>
    //<h3 className="vertical-timeline-element-title">Art Director</h3>
    //<h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    //<p>
      //Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    //</p>
  //</VerticalTimelineElement>

const  VerticalTimelineComponent = ({movies, ...props}) => {
    const output =
        <VerticalTimeline>

            {movies.map( movie => (
                  <VerticalTimelineElement
                    key={movie.title}
                    className="vertical-timeline-element--work"
                    date={movie.release_date}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">{movie.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{movie.release_date}</h4>
                    <p>{movie.overview} </p>

                  </VerticalTimelineElement>
            )) }


                  <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<StarIcon />}
                  />

        </VerticalTimeline>

    return (
        output
    );



};

const moviesDataMapper = movie => ({
    title: movie.title,
    release_date: movie.release_date,
    overview: movie.overview,
    short_overview: movie.short_overview,
});


const mapActionsToProps = { refreshMovies: refreshMoviesAction };

const mapStateToProps = state => ({
    movies: !state.refreshedMovies.data ? [] : state.refreshedMovies.data.slice(0,5).map(moviesDataMapper)
});

export default connect(mapStateToProps, mapActionsToProps)(VerticalTimelineDisplay);
