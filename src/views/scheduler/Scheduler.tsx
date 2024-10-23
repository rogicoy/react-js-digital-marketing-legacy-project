/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { useCallback, useEffect, useState, useRef, FC, useMemo } from 'react';
import { format, startOfMonth } from 'date-fns';
import helpers from 'utils/helpers';
import { DateRange, ISocialMenuScheduler, ISocialType } from 'types';
import { IScheduler, EventFbFormData, EventIgFormData, EventLiFormData, EventTwFormData } from './types';
import { GetIgPoststRequest, GetSchedPostsResponse, GetFbPoststRequest, GetPostStatus } from 'store/scheduler/models';
import { ISchedulerStateUpdate } from './interface';

// material-ui
import { Box, CircularProgress, Dialog, Theme, useMediaQuery } from '@material-ui/core';

// hooks
import useConnectedSocials from 'hooks/useConnectedSocials';

// grapqhl
import { useMutation } from '@apollo/client';
import gql from 'store/scheduler/gql';

// third-party
import _ from 'lodash';
import { FormikValues } from 'formik';
import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';

// project imports
import MainCardCustom from 'ui-component/cards/MainCardCustom';
import CalendarStyled from './calendar/CalendarStyled';
import Toolbar from './calendar/Toolbar';
import EventContents from './calendar/EventContents';
import AddEventFormIg from './dialog/AddEventFormIg';
import AddEventFormFb from './dialog/AddEventFormFb';
import AddEventFormTw from './dialog/AddEventFormTw';
import AddEventFormLi from './dialog/AddEventFormLi';
import UpdateEventFormIg from './dialog/UpdateEventFormIg';
import UpdateEventFormFb from './dialog/UpdateEventFormFb';
import UpdateEventFormTw from './dialog/UpdateEventFormTw';
import UpdateEventFormLi from './dialog/UpdateEventFormLi';
import Success from './dialog/Success';
import MenuProfileItems from './menu-items/MenuProfileItems';
import ConnectAccount from './connect-account/ConnectAccount';
import CalendarSkeleton from 'ui-component/cards/Skeleton/CalendarSkeleton';

const Scheduler: FC<IScheduler> = (props) => {
  const {
    state,
    doGetIgPosts,
    doGetFbPosts,
    doGetTwPosts,
    doGetLiPosts,
    doOpenPostDialog,
    doOpenSuccessDialog,
    doClearPosts,
    doEditPostDialog
  } = props;

  const calendarRef = useRef<FullCalendar>(null);
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // hooks
  const { menuItems, checkSocials, isLoading, getMenuItems } = useConnectedSocials();

  // query
  const {
    mutation: { instagramSchedulePost, facebookSchedulePost, twitterSchedulePost, linkedinSchedulePost }
  } = gql;

  // @instagram
  const [updateIgPost, { loading: updateIgLoading }] = useMutation<{
    instagramSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(instagramSchedulePost, {
    fetchPolicy: 'network-only'
  });

  // @facebook
  const [updateFbPost, { loading: updateFbLoading }] = useMutation<{
    facebookSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(facebookSchedulePost, {
    fetchPolicy: 'network-only'
  });

  // @twitter
  const [updateTwPost, { loading: updateTwLoading }] = useMutation<{
    twitterSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(twitterSchedulePost, {
    fetchPolicy: 'network-only'
  });

  // @linkedin
  const [updateLiPost, { loading: updateLiLoading }] = useMutation<{
    linkedinSchedulePost: {
      info: string;
      status: number;
      error_message: string;
      data: JSON;
    };
  }>(linkedinSchedulePost, {
    fetchPolicy: 'network-only'
  });

  // states
  const [activeSocial, setActiveSocial] = useState<ISocialType[]>(['facebook', 'twitter', 'instagram', 'linkedin']);
  const [activeSocialModal, setActiveSocialModal] = useState<ISocialType | null>(null);
  const [postDetails, setPostDetails] = useState<GetSchedPostsResponse | null>(null);
  const [postId, setPostId] = useState<string>('');
  const [eventPosts, setEventPosts] = useState<GetSchedPostsResponse[]>([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [fbPreFilledValues, setFbPrefilledValues] = useState<EventFbFormData | null>(null);
  const [igPreFilledValues, setIgPrefilledValues] = useState<EventIgFormData | null>(null);
  const [twPreFilledValues, setTwPrefilledValues] = useState<EventTwFormData | null>(null);
  const [liPreFilledValues, setLiPrefilledValues] = useState<EventLiFormData | null>(null);

  // get all posts
  const getAllEvents = useCallback(() => {
    const firstDay = format(startOfMonth(date), 'yyy-MM-dd');
    const payload: GetIgPoststRequest | GetFbPoststRequest = {
      date: firstDay
    };

    doGetIgPosts(payload);
    doGetFbPosts(payload);
    doGetTwPosts(payload);
    doGetLiPosts(payload);
  }, [doGetIgPosts, doGetFbPosts, doGetTwPosts, doGetLiPosts, date]);

  useEffect(() => {
    if (state.cleared) getAllEvents();
  }, [getAllEvents, state.cleared]);

  // clear all posts first
  const clearEventPosts = useCallback(() => {
    doClearPosts(true);
  }, [doClearPosts]);

  useEffect(() => {
    clearEventPosts();
  }, [clearEventPosts]);

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      clearEventPosts();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      clearEventPosts();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      clearEventPosts();
      setDate(calendarApi.getDate());
    }
  };

  // calendar event select/add/edit/delete
  const handleRangeSelect = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    setSelectedRange({
      start: arg.start,
      end: arg.end
    });
    doOpenPostDialog(true);
  };

  // event select
  const handleEventSelect = (arg: EventClickArg) => {
    const { event } = arg;
    const platform: ISocialType = event.extendedProps?.platform;
    const status: GetPostStatus = event.extendedProps?.status;

    if (!(status === 'COMPLETED' || status === 'FAILED' || status === 'PUBLISHED')) {
      setPostId(arg.event.id);
      setActiveSocialModal(platform);
      doEditPostDialog(true);
    }
  };

  // handle drop event
  const handleEventDropEvent = async ({ event }: EventResizeDoneArg | EventDropArg) => {
    try {
      const platform: ISocialType | null = event.extendedProps?.platform;

      if (event.start) {
        const currentPosts: GetSchedPostsResponse[] = [...eventPosts];
        const findIndex = currentPosts.findIndex((item: GetSchedPostsResponse) => item.id === event.id);

        currentPosts[findIndex] = {
          ...currentPosts[findIndex],
          start: new Date(event.start),
          end: new Date(event.start)
        };

        setEventPosts(currentPosts);

        const datePostAt = event.start ? new Date(event.start) : new Date();
        const postAt = format(new Date(datePostAt), 'yyy/MM/dd hh:mm a');
        const calendarDate = format(new Date(datePostAt), 'MMMyyy').toUpperCase();

        if (platform === 'instagram') {
          await updateIgPost({
            variables: {
              id: event.id,
              input: {
                caption: event.extendedProps.description,
                postAt,
                calendarDate
              }
            }
          });
        }

        if (platform === 'facebook') {
          await updateFbPost({
            variables: {
              id: event.id,
              input: {
                caption: event.extendedProps.description,
                postAt,
                calendarDate
              }
            }
          });
        }

        if (platform === 'twitter') {
          await updateTwPost({
            variables: {
              id: event.id,
              input: {
                caption: event.extendedProps.description,
                postAt,
                calendarDate
              }
            }
          });
        }

        if (platform === 'linkedin') {
          await updateLiPost({
            variables: {
              id: event.id,
              input: {
                caption: event.extendedProps.description,
                postAt,
                calendarDate
              }
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
      // reset when error
      setEventPosts(state.posts);
    }
  };

  const handleEventCreate = async (data: FormikValues) => {
    const payload: GetSchedPostsResponse = {
      id: data.id,
      title: data.title,
      image: helpers.fileToObjectUrl(data.image),
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
      textColor: data.textColor,
      extendedProps: {
        platform: data.platform,
        status: data.platform === 'linkedin' ? 'SCHEDULED' : 'PENDING',
        mediaType: data.mediaType,
        mediaFrame: helpers.fileToObjectUrl(data.mediaFrame)
      }
    };

    /**
     * set pre filled social media
     * facebook, twitter, instagram, linkedin
     */

    setFbPrefilledValues({
      mediaId: data.mediaId,
      image: data.image,
      description: data.description,
      start: data.start,
      location: data.location,
      mediaFrame: data.mediaFrame,
      mediaType: data.mediaType
    });

    setIgPrefilledValues({
      mediaId: data.mediaId,
      image: data.image,
      description: data.description,
      start: data.start,
      location: data.location,
      mediaFrame: data.mediaFrame,
      mediaType: data.mediaType,
      comment: data.comment
    });

    setTwPrefilledValues({
      mediaId: data.mediaId,
      image: data.image,
      description: data.description,
      start: data.start,
      location: data.location,
      mediaFrame: data.mediaFrame,
      mediaType: data.mediaType,
      comment: data.comment
    });

    setLiPrefilledValues({
      mediaId: data.mediaId,
      title: data.title,
      image: data.image,
      description: data.description,
      start: data.start,
      location: data.location,
      mediaFrame: data.mediaFrame,
      mediaType: data.mediaType,
      originalUrl: data.originalUrl
    });

    setEventPosts((prev) => [...prev, payload]);
    handleModalClose();
    // success modal
    setPostDetails(payload);
    doOpenSuccessDialog(true, data.platform);
  };

  /**
   * clears the social pre filled
   * @param social
   */
  const handleAddClick = (social: ISocialType) => {
    setFbPrefilledValues(null);
    setIgPrefilledValues(null);
    setTwPrefilledValues(null);
    setLiPrefilledValues(null);
    setActiveSocialModal(social);
    doOpenPostDialog(true);
  };

  /**
   * doesnt clear the social pre filled
   * @param social
   */
  const handleAddClickPreFilled = (social: ISocialType) => {
    setActiveSocialModal(social);
    doOpenPostDialog(true);
  };

  const handleModalClose = () => {
    doOpenPostDialog(false);
    doEditPostDialog(false);
    setSelectedRange(null);
    setPostId('');
    setActiveSocialModal(null);
  };

  const handleCloseSuccess = () => {
    setPostDetails(null);
    doOpenSuccessDialog(false, null);
  };

  // handle social active for filter
  const handleActiveSocial = (social: ISocialType) => {
    const currentSocials = [...activeSocial];
    const index = currentSocials.indexOf(social);

    if (index > -1) {
      currentSocials.splice(index, 1);
      setActiveSocial(currentSocials);
    } else {
      setActiveSocial((prev: ISocialType[]) => [...prev, social]);
    }
  };

  // delete an event
  const handleDeleteEvent = (id: string) => {
    const updatedEvents = _.reject(eventPosts, { id });
    setEventPosts(updatedEvents);
    handleModalClose();
  };

  // update state from modal
  const handleUpdateState = ({ id, postDetailsForm }: ISchedulerStateUpdate) => {
    const currentPosts = [...eventPosts];
    const findIndex = currentPosts.findIndex((item: GetSchedPostsResponse) => item.id === id);

    currentPosts[findIndex] = {
      ...currentPosts[findIndex],
      image: postDetailsForm.image,
      description: postDetailsForm.description,
      start: new Date(postDetailsForm.start),
      end: new Date(postDetailsForm.start),
      extendedProps: {
        ...currentPosts[findIndex].extendedProps,
        mediaType: postDetailsForm.mediaType,
        mediaFrame: postDetailsForm.mediaFrame
      }
    };

    setEventPosts(currentPosts);
    handleModalClose();
  };

  const socialMediaActive = useMemo(() => menuItems.find((item: ISocialMenuScheduler) => item.social === activeSocialModal), [
    activeSocialModal,
    menuItems
  ]);

  useEffect(() => {
    if (state.posts.length > 0) setEventPosts(state.posts);
  }, [state.posts]);

  /**
   * get connected social medias
   */
  useEffect(() => {
    getMenuItems();
  }, []);

  /**
   * is loading
   */
  if (isLoading) return <CalendarSkeleton />;

  /**
   * check if social media
   * is connected
   */
  if (!checkSocials) return <ConnectAccount />;

  return (
    <MainCardCustom
      title="Content Scheduler"
      subTitle="Set your strategy months in advance! Choose an image, video or GIF saved in your Content Manager to schedule a post across multiple social media platforms."
      sx={{
        background: 'linear-gradient(#7F66EB 0%, #9618F7 100%)'
      }}
      hasFloatingImages
      titleWhite
      secondary={<MenuProfileItems menuItems={menuItems} handleAddClick={handleAddClick} />}
    >
      <CalendarStyled>
        {(updateIgLoading || updateFbLoading || updateTwLoading || updateLiLoading) && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}

        <Toolbar
          date={date}
          view={view}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
          onSetSocial={handleActiveSocial}
          activeSocials={activeSocial}
          menuItems={menuItems}
        />

        <FullCalendar
          weekends
          editable
          droppable
          // selectable
          // eventConstraint={{
          //   start: '00:01',
          //   end: '23:59'
          // }}
          events={
            activeSocial.length > 0
              ? eventPosts.filter((item: GetSchedPostsResponse) => activeSocial.includes(item.extendedProps.platform))
              : []
          }
          eventContent={(data) => <EventContents data={data} />}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={view}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          eventDrop={handleEventDropEvent}
          eventClick={handleEventSelect}
          // eventResize={handleEventUpdate}
          height={matchSm ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      <Dialog
        maxWidth={activeSocialModal === 'twitter' ? 'sm' : 'md'}
        // maxWidth="md"
        fullWidth
        onClose={handleModalClose}
        open={state.openPost}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {state.openPost && (
          <>
            {activeSocialModal === 'instagram' && (
              <AddEventFormIg
                range={selectedRange}
                onCancel={handleModalClose}
                handleCreate={handleEventCreate}
                social={socialMediaActive}
                preFill={igPreFilledValues}
              />
            )}
            {activeSocialModal === 'facebook' && (
              <AddEventFormFb
                range={selectedRange}
                onCancel={handleModalClose}
                handleCreate={handleEventCreate}
                social={socialMediaActive}
                preFill={fbPreFilledValues}
              />
            )}
            {activeSocialModal === 'twitter' && (
              <AddEventFormTw
                range={selectedRange}
                onCancel={handleModalClose}
                handleCreate={handleEventCreate}
                social={socialMediaActive}
                preFill={twPreFilledValues}
              />
            )}
            {activeSocialModal === 'linkedin' && (
              <AddEventFormLi
                range={selectedRange}
                onCancel={handleModalClose}
                handleCreate={handleEventCreate}
                social={socialMediaActive}
                preFill={liPreFilledValues}
              />
            )}
          </>
        )}
      </Dialog>

      {/* for edit post */}
      <Dialog
        maxWidth={activeSocialModal === 'twitter' ? 'sm' : 'md'}
        fullWidth
        onClose={handleModalClose}
        open={state.editPost}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {state.editPost && (
          <>
            {activeSocialModal === 'instagram' && (
              <UpdateEventFormIg
                range={selectedRange}
                onCancel={handleModalClose}
                postId={postId}
                onUpdate={handleUpdateState}
                onDelete={handleDeleteEvent}
                social={socialMediaActive}
              />
            )}

            {activeSocialModal === 'facebook' && (
              <UpdateEventFormFb
                range={selectedRange}
                onCancel={handleModalClose}
                postId={postId}
                onUpdate={handleUpdateState}
                onDelete={handleDeleteEvent}
                social={socialMediaActive}
              />
            )}

            {activeSocialModal === 'twitter' && (
              <UpdateEventFormTw
                range={selectedRange}
                onCancel={handleModalClose}
                postId={postId}
                onUpdate={handleUpdateState}
                onDelete={handleDeleteEvent}
                social={socialMediaActive}
              />
            )}

            {activeSocialModal === 'linkedin' && (
              <UpdateEventFormLi
                range={selectedRange}
                onCancel={handleModalClose}
                postId={postId}
                onUpdate={handleUpdateState}
                onDelete={handleDeleteEvent}
                social={socialMediaActive}
              />
            )}
          </>
        )}
      </Dialog>

      {/* success dialog */}
      <Dialog maxWidth="sm" onClose={handleCloseSuccess} open={state.openSuccess.open} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <Success
          onClose={handleCloseSuccess}
          postDetails={postDetails}
          active={state.openSuccess.active}
          menuItems={menuItems}
          handleAddClick={handleAddClickPreFilled}
        />
      </Dialog>
    </MainCardCustom>
  );
};

export default Scheduler;
