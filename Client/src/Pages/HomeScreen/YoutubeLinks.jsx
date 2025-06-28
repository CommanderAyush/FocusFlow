import React from 'react'

function YoutubeLinks(props) {

  return (
    <div className='inline-block mx-3'>
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full max-w-xl rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
      >
        {/* Thumbnail on the left */}
        <div className="w-40 h-28 flex-shrink-0 bg-gray-200">
          <img
            src={props.thumbnail}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content on the right */}
        <div className="flex flex-col justify-between p-4">
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            {props.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {props.description}
          </p>
        </div>
      </a>
    </div>
  );
};

export default YoutubeLinks;