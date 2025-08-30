import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useQueryStore from "@/store/queryStore";
import { nameStyle, Randomness } from "@/helpers/constant";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const QuerDialog = ({ querydialog, setquerydialog, keyword }) => {
  const router = useRouter();
  const { query, setNameStyle, setRandomness, setQuery } = useQueryStore();
  const handleNameStyle = (nameStyle) => {
    setNameStyle(nameStyle);
  };

  const handleRandomness = (randomness) => {
    setRandomness(randomness);
  };

  const keywordChnage = (e) => {
    setQuery({ keyword: e.target.value });
  };
  const descriptionChange = (e) => {
    setQuery({ description: e.target.value });
  };
  const gen = () => {
    router.push("/business-name");
  };

  return (
    <Dialog
      open={querydialog}
      onOpenChange={() => setquerydialog(!querydialog)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seached for: {`${query.keyword}`}</DialogTitle>
        </DialogHeader>
        <Tabs className={``} defaultValue="account">
          <TabsList className={`p-2 mb-3`}>
            <TabsTrigger value="NameStyle">Name Style</TabsTrigger>
            <TabsTrigger value="randomness">Randomness</TabsTrigger>
            <TabsTrigger value="brandinfo">Brand Info</TabsTrigger>
          </TabsList>
          <TabsContent value="NameStyle">
            <RadioGroup
              onValueChange={handleNameStyle}
              className={`grid grid-cols-2 gap-5`}
              defaultValue="Auto"
            >
              {nameStyle.map((obj, index) => (
                <Label
                  className={`border p-2 rounded-2xl`}
                  key={`namestyle${obj.id}`}
                  htmlFor={`namestyle${obj.id}`}
                >
                  <RadioGroupItem value={obj.name} id={`namestyle${obj.id}`} />
                  <div>
                    <p className="text-white">{`${obj.name}`}</p>
                    <p className="text-gray-400">{`${obj.description}`}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="randomness">
            <RadioGroup defaultValue="Medium" onValueChange={handleRandomness}>
              {Randomness.map((obj, index) => (
                <Label
                  className={`border p-2 rounded-2xl`}
                  key={`namestyle${obj.id}`}
                  htmlFor={`namestyle${obj.id}`}
                >
                  <RadioGroupItem value={obj.name} id={`namestyle${obj.id}`} />
                  <div>
                    <p className="text-white">{`${obj.name}`}</p>
                    <p className="text-gray-400">{`${obj.description}`}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="brandinfo">
            <span className=" text-lg">Enter Brand Info</span>
            <div className=" flex mb-3 gap-2 flex-col justify-center ">
              <Label>Keyword</Label>
              <Input
                placeholder="keyword"
                name="keyword"
                onChange={keywordChnage}
                value={`${query?.keyword || ""}`}
              />
            </div>
            <div className=" flex mb-3 gap-2 flex-col justify-center">
              <Label>Description</Label>
              <Input
                onChange={descriptionChange}
                name="description"
                value={`${query?.description || ""}`}
                placeholder="description"
              />
            </div>
            <Button onClick={gen}>Proceed</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuerDialog;
