import { StyledGrid } from "../styles/StyleGrid";

const ArtistsGrid = ({ artists }) => (
  <>
    {artists && artists.length ? (
      <StyledGrid>
        {artists.map((e, i) => (
          <div className="top_track_parent">
            <li className="grid__item" key={i}>
              <div key={i} className="grid__item__inner">
                {e.images[0] && (
                  <div>
                    <img alt={e.name} src={e.images[0]["url"]}></img>
                  </div>
                )}
                <h3 className="grid__item__name overflow-ellipsis">
                  {e.name}
                </h3>
                <p className="grid__item__label">Artist</p>
              </div>
            </li>
          </div>
        ))}
      </StyledGrid>
    ) : (
      <p className="empty__notice">No Artist Available</p>
    )}
  </>
);
export default ArtistsGrid;
