import Header from "../../components/layouts/Header";
import BookmarkList from "../../components/views/BookmarkList";
import SongDetail from "../../components/views/SongDetail";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";

export default function DefaultSizeDisplay() {
  const router = useRouter();
  const selectedId = router.query.id;
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <BookmarkList />
          </Grid>
          <Grid item xs={8}>
            {selectedId && (
              <SongDetail key={selectedId} selectedId={selectedId} />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
