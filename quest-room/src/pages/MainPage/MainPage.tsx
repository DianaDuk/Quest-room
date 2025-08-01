import { Box, Text, Button, Image } from "@chakra-ui/react";
import QuestCard from "../../components/QuestCard/QuestCard";
import { useEffect, useState } from "react";
import { useQuests, type Quest } from "../../api/QuestAPI";

const MainPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("все квесты");

  const filters = [
    { title: "Все квесты", value: "все квесты", img: "/all-quests.svg" },
    { title: "Приключения", value: "приключения", img: "/advant.svg" },
    { title: "Ужасы", value: "ужасы", img: "/horrible.svg" },
    { title: "Мистика", value: "мистика", img: "/mistika.svg" },
    { title: "Детектив", value: "детектив", img: "/detectiv.svg" },
    { title: "Sci-fi", value: "sci-fi", img: "/scifi.svg" },
  ];

  const {data: quests, isLoading, error} = useQuests(activeFilter);

  const handleCategoryClick = (category: string) => {
    setActiveFilter(category);
  };

    if(isLoading) return <Text>Loading...</Text>;
    if(error) return <Text>Error loading quest</Text>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box pt="3" display="flex" flexDirection="column" gap="8px" maxWidth="1082px" width="100%">
        <Text className="text-[#F2890F]">квесты в Днепре</Text>
        <Text className="text-5xl font-extrabold">Выберите тематику</Text>
      </Box>

      <Box className="flex items-center justify-center" gap="40px" pt="20">
        {filters.map((filter, index) => (
          <Box key={index} className="flex items-center" gap="40px">
            <Button
              leftIcon={<Image src={filter.img} />}
              variant={activeFilter === filter.value ? "solid" : "link"}
              colorScheme={activeFilter === filter.value ? "orange" : "gray"}
              onClick={() => handleCategoryClick(filter.value)}
            >
              {filter.title}
            </Button>

            {index + 1 < filters.length && (
              <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />
            )}
          </Box>
        ))}
      </Box>

      <Box className="flex justify-center" py="40px">
        <Box w="1082px" className="flex flex-wrap" gap="25px">
          {quests?.map((quest) => (
            <QuestCard
              key={quest.id}
              title={quest.title}
              people={quest.players}
              level={quest.level}
              img={quest.image}
              id={quest.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
