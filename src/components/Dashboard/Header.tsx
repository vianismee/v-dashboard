import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Header() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <Card className="aspect-video rounded-2xl">
        <CardHeader>
          <CardTitle>Total Project</CardTitle>
        </CardHeader>
      </Card>
      <Card className="aspect-video rounded-2xl">
        <CardHeader>
          <CardTitle>On Going Project</CardTitle>
        </CardHeader>
      </Card>
      <Card className="aspect-video rounded-2xl">
        <CardHeader>
          <CardTitle>Pending</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Header;
