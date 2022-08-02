import { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import SongDetail from "../../components/views/SongDetail";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    //
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <div>選んだ曲</div>
        <div style={{ paddingLeft: "32px", width: "80%" }}>
          <SongDetail songId={id} hasData={false} />
        </div>
      </div>
    </div>
  );
}
