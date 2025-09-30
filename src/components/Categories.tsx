import React from 'react';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 1,
      title: 'Fahrrad',
      description: 'Rennrad, Mountainbike und Stadtradtouren rund um Frankfurt',
      image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k47ed55kem482y77kp492938%2F1756891748_img_1.webp?st=2025-09-03T08%3A09%3A05Z&se=2025-09-09T09%3A09%3A05Z&sks=b&skt=2025-09-03T08%3A09%3A05Z&ske=2025-09-09T09%3A09%3A05Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=fea36edb-a052-425e-a84a-436fdce0a7b4&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=OfCS2qt9xDm2uzagu2gieZpcyFjjte8vV6aiRD0SflY%3D&az=oaivgprodscus',
      count: 'Angebote soon'
    },
    {
      id: 2,
      title: 'Fußball',
      description: 'Vereinstraining, Spielen mit Freunden und Trainingsgruppen für alle Level',
      image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k47fwajvedz8xee3bxyj4037%2F1756893294_img_1.webp?st=2025-09-03T08%3A05%3A10Z&se=2025-09-09T09%3A05%3A10Z&sks=b&skt=2025-09-03T08%3A05%3A10Z&ske=2025-09-09T09%3A05%3A10Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=fea36edb-a052-425e-a84a-436fdce0a7b4&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=CJDKXnVmwIgEIkhxb5mLGz6%2B%2FfWsXYJ6FcTEPh3bDTc%3D&az=oaivgprodscus',
      count: 'Angebote soon'
    },
    {
      id: 3,
      title: 'Basketball',
      description: 'Streetball, Vereinsbasketball und Training für alle Altersgruppen',
      image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k47nmg11f7wb10628bv2zt04%2F1756899334_img_0.webp?st=2025-09-03T10%3A34%3A51Z&se=2025-09-09T11%3A34%3A51Z&sks=b&skt=2025-09-03T10%3A34%3A51Z&ske=2025-09-09T11%3A34%3A51Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=fea36edb-a052-425e-a84a-436fdce0a7b4&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=M9MPbZQIAahpNuO1NTKUww6oXiEcjPl%2FOTIubXAjDr4%3D&az=oaivgprodscus',
      count: 'Angebote soon'
    },
    {
      id: 4,
      title: 'Skaten',
      description: 'Skateboard, Inline-Skates und Rollschuh in Parks und auf der Straße',
      image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k47hcd8rfndbrnmtdxq7arff%2F1756894867_img_0.webp?st=2025-09-03T09%3A02%3A28Z&se=2025-09-09T10%3A02%3A28Z&sks=b&skt=2025-09-03T09%3A02%3A28Z&ske=2025-09-09T10%3A02%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=fea36edb-a052-425e-a84a-436fdce0a7b4&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=vwsyi3Pkhb8WsI66xU8R2%2FKvYuEVq72woA0d3ACW%2BDw%3D&az=oaivgprodscus',
      count: 'Angebote soon'
    },
    {
      id: 5,
      title: 'Padel',
      description: 'Padel Partner finden für Doppel und Einzel, ob Training oder Spiel',
      image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01k4jtdanjedkvhcbpa998psmy%2F1757273439_img_0.webp?st=2025-09-07T17%3A59%3A41Z&se=2025-09-13T18%3A59%3A41Z&sks=b&skt=2025-09-07T17%3A59%3A41Z&ske=2025-09-13T18%3A59%3A41Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ffff87a-01f1-47c9-9090-32999d4d6380&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=3O2vobktz2hnJuyb5owg%2B2cIRMbP7%2BuHpgRFNlM4h4E%3D&az=oaivgprodscus',
      count: 'Angebote soon'
    },
    {
      id: 6,
      title: 'Laufen',
      description: 'Laufgruppen, Marathontraining und Jogging-Treffs',
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      count: 'Angebote soon'
    }
  ];

  return (
    <section id="kategorien" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sport<span className="text-orange-500">angebote</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Entdecke vielfältige Sportarten finde das perfekte Training, die perfekte Trainingsgruppe ohne einfach Personen mit denen es Spaß macht Sport zu machen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category.count}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {category.description}
                </p>
                <button 
                  onClick={() => onCategorySelect(category.title)}
                  className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 group-hover:underline"
                >
                  Angebote entdecken →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;