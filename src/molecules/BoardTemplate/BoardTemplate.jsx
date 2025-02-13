import TextContents from '@/atoms/TextContents/TextContents';

function BoardItem({ imageSrc, span }) {
  const width = span ? 'calc(47px * 2)' : '47px';
  const itemHeight = span ? 'calc(47px * 2)' : '47px';

  return (
    <div className={`w-[${width}] h-[${itemHeight}] ${span}`}>
      <img src={imageSrc} className="w-full h-full object-cover" />
    </div>
  );
}

function BoardTemplate({ text, images, onBoardClick }) {
  return (
    <div>
      <TextContents text={text} fontFamily="font-serif" fontWeight="font-bold" fontSize="text-[18px]" padding="p-2" />
      <div className="w-[280px] h-[170px] rounded-2xl overflow-hidden" onClick={() => onBoardClick(text.toLowerCase())}>
        <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-1px">
          {images.slice(0, 3).map((image, index) => (
            <BoardItem key={image} imageSrc={image} span={index === 0 ? 'col-span-2 row-span-2' : ''} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardTemplate;
