import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "../lib/utils";
import { AboutList } from "../constants";

const ProfilePageTab = ({ userDetails }) => {
  return (
    <div>
      <Tabs defaultValue="about">
        <TabsList className={cn("text-white")}>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="fav">Favourites</TabsTrigger>
          <TabsTrigger value="purchase">Purchased</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className={cn("mt-3 ml-3")}>
          {AboutList.map((item, index) => (
            <div className={index === 0 ? "" : "mt-4"}>
              <h1>{item.title}</h1>
              <p>{item.tag ? item.tag : "-"}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="fav">Change your password here.</TabsContent>
        <TabsContent value="purchase">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePageTab;
