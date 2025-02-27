import { useState, useRef } from "react";

import "./App.css";

type Item = {
  name: string;
  type: "Fruit" | "Vegetable";
};

type TimeoutRef = {
  [key: string]: number;
};

function App() {
  const [mainList, setMainList] = useState<Item[]>([
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ]);

  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);

  const timeoutRefs = useRef<TimeoutRef>({});

  const handleFunction = (item: Item) => {
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name]);
    }

    setMainList((currentMainList) =>
      currentMainList.filter((i) => i.name !== item.name)
    );

    if (item.type === "Fruit") {
      setFruitList((currentFruitList) => [...currentFruitList, item]);
    } else {
      setVegetableList((currentVegetableList) => [
        ...currentVegetableList,
        item,
      ]);
    }

    timeoutRefs.current[item.name] = setTimeout(() => {
      handleRemove(item);
      delete timeoutRefs.current[item.name];
    }, 5000);
  };

  const handleRemove = (item: Item) => {
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name]);
      delete timeoutRefs.current[item.name];
    }

    if (item.type === "Fruit") {
      setFruitList((currentFruitList) =>
        currentFruitList.filter((i) => i.name !== item.name)
      );
    } else {
      setVegetableList((currentVegetableList) =>
        currentVegetableList.filter((i) => i.name !== item.name)
      );
    }
    setMainList((currentMainList) => [...currentMainList, item]);
  };

  return (
    <div className="flex gap-4 text-neutral-800 h-[584px]">
      <ul className="p-2 flex flex-col gap-2 border-2 rounded-lg border-neutral-300 w-64">
        {mainList.map((item) => (
          <li
            className="border-2 border-neutral-300 p-2 cursor-pointer"
            key={item.name}
            onClick={() => handleFunction(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="p-2 flex flex-col gap-2 border-2 rounded-lg border-neutral-300 w-64">
        <h2 className="font-bold border-2 p-2 rounded-md border-neutral-400">
          Fruit
        </h2>
        {fruitList.map((item) => (
          <li
            className="border-2 border-neutral-300 p-2 cursor-pointer"
            key={item.name}
            onClick={() => handleRemove(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="p-2 flex flex-col gap-2  border-2 rounded-lg border-neutral-300 w-64">
        <h2 className="font-bold border-2 p-2 rounded-md border-neutral-400">
          Vegetable
        </h2>
        {vegetableList.map((item) => (
          <li
            className="border-2 border-neutral-300 p-2 cursor-pointer"
            key={item.name}
            onClick={() => handleRemove(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
