import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Fragment } from 'react'
import React, { useState } from "react";
import DropSpeaker from '../icons/DropDown/DropSpeaker';
import { useMeetingAppContext } from '../MeetingAppContextDef';

export default function DropDownSpeaker({ speakers }) {

  const {
    selectedSpeaker,
    isMicrophonePermissionAllowed
  } = useMeetingAppContext()
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Popover className="relative ml-3">
        {({ open }) => (
          <>
            <Popover.Button
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
              disabled={!isMicrophonePermissionAllowed}
              className={`focus:outline-none hover:ring-1 hover:ring-gray-250 hover:bg-black 
              ${open
                  ? "text-white ring-1 ring-gray-250 bg-black"
                  : "text-customGray-250 hover:text-white"
                }
              group inline-flex items-center rounded-md px-1 py-1 w-44 text-base font-normal
              ${!isMicrophonePermissionAllowed ? "opacity-50" : ""}`}
            >
              <DropSpeaker fillColor={isHovered || open ? "#FFF" : "#B4B4B4"} />
              <span className=" overflow-hidden whitespace-nowrap overflow-ellipsis w-28 ml-6">
                {isMicrophonePermissionAllowed ? selectedSpeaker?.label : "Permission Needed"}
              </span>
              <ChevronDownIcon
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                ml-8 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80 mt-1`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

