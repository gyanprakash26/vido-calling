import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import React, { useEffect, useRef, useState } from "react";
import { useMeetingAppContext } from '../MeetingAppContextDef';

export default function DropDown({
  audioTrack,
  didDeviceChange,
  setDidDeviceChange
}) {

  const {
    selectedMic,

    isMicrophonePermissionAllowed
  } = useMeetingAppContext();

  const audioTrackRef = useRef();

  useEffect(() => {
    audioTrackRef.current = audioTrack;
  }, [audioTrack]);

  useEffect(() => {
    if (didDeviceChange) {
      setDidDeviceChange(false)
    }
  }, [didDeviceChange])

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
              <span className="overflow-hidden whitespace-nowrap overflow-ellipsis w-28 ml-6">
                {isMicrophonePermissionAllowed ? selectedMic?.label : "Permission Needed"}
              </span>

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

